import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lütfen isim giriniz.'],
      trim: true,
      maxlength: [100, 'İsim en fazla 100 karakter olabilir.'],
      minlength: [3, 'İsim en az 3 karakter olabilir.'],
    },
    email: {
      type: String,
      required: [true, 'Lütfen e-posta adresinizi giriniz'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: String,

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    image: {
      type: String,
    },
    resetCode: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

export default mongoose.models.User || mongoose.model('User', userSchema);
