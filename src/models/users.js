import mongoose from 'mongoose';

const userSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rol: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v === "teacher" || v === "student";
      },
      message: "El campo rol solo puede ser 'teacher' o 'student'"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);