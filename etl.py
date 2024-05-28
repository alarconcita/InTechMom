import googlemaps
import mysql.connector

# Configuración de la API de Google Maps
gmaps = googlemaps.Client(key='#falta_API_key')

# Conexión a la base de datos MySQL
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'mysql',
    'database': 'etl'
}

# Inicializamos la conexión a la base de datos con los parámetros de arriba
conn = mysql.connector.connect(**mysql_config)
cursor = conn.cursor()

# Definir la región o país (en este caso, Colombia), el radio y el tipo de comercio
pagetokenKey = 'AeJbb8NpJneK4J8Md_akgHY7c9eJC9L6YTFsfYLkEHkq17d5CvWQuCPBX6iHkA7X_hA_c7A5ZI5as9s2cGpBs19-kb1d41yLUYoa6x8XDXD'
localidad = (4.6564910004363255, -74.10301816209089)
radius = 10000
tipo_comercio = "shopping_mall"

# Extraer información de comercios de Google Maps
def extraer_comercios():
    resultados = []
    places = gmaps.places(location=localidad, radius=radius, type=tipo_comercio)

    for place in places['results']:
        place_id = place['place_id']  # Obtiene el ID del lugar
        detalles = gmaps.place(place_id=place_id, fields=["name", "formatted_address", "geometry", "rating", "type",
                                                          "formatted_phone_number", "international_phone_number", "website",
                                                          "url", "user_ratings_total", "business_status"])
        # Extraer detalles si están disponibles
        nombre = detalles['result']['name'] if 'name' in detalles['result'] else None
        direccion = detalles['result']['formatted_address'] if 'formatted_address' in detalles['result'] else None
        latitud = detalles['result']['geometry']['location']['lat'] if 'geometry' in detalles['result'] else None
        longitud = detalles['result']['geometry']['location']['lng'] if 'geometry' in detalles['result'] else None
        rating = detalles['result']['rating'] if 'rating' in detalles['result'] else None
        tipos = ', '.join(detalles['result']['types']) if 'types' in detalles['result'] else None
        telefono = detalles['result']['formatted_phone_number'] if 'formatted_phone_number' in detalles['result'] else None
        telefono_internacional = detalles['result']['international_phone_number'] if 'international_phone_number' in detalles['result'] else None
        sitio_web = detalles['result']['website'] if 'website' in detalles['result'] else None
        url_maps = detalles['result']['url'] if 'url' in detalles['result'] else None
        user_ratings_total = detalles['result']['user_ratings_total'] if 'user_ratings_total' in detalles['result'] else None
        comercio_status = detalles['result']['business_status'] if 'business_status' in detalles['result'] else None

        resultados.append((place_id, nombre, direccion, latitud, longitud, rating, tipos, telefono,
                           telefono_internacional, sitio_web, url_maps, user_ratings_total, comercio_status))
    return resultados

#transformar los datos y almacenar en MySQL
def cargar_datos_en_mysql(data):
    insert_query="INSERT INTO comercios (comercio_id, nombre, direccion, latitud, longitud, rating, tipos, telefono, telefono_internacional, sitio_web, url_maps, user_ratings_total, comercio_status)"
    for comercio in data:
        cursor.execute(insert_query, comercio)
        conn.commit()
try:
    comercios_colombia=extraer_comercios()
    cargar_datos_en_mysql(comercios_colombia)
    print("Datos cargados exitosamente en MySQL")
except Exception as e:
    print("Error:", str(e))
finally:
    cursor.close()
    conn.close