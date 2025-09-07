import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const ROLE = ['admin', 'user'];


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, index: true },
password: { type: String, required: true, minlength: 6, select: false },
role: { type: String, enum: ROLE, default: 'user', index: true },
isActive: { type: Boolean, default: true },
},
{ timestamps: true }
);


userSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


userSchema.methods.comparePassword = async function (candidate) {
return bcrypt.compare(candidate, this.password);
};


userSchema.methods.toSafeJSON = function () {
const obj = this.toObject({ getters: true, virtuals: false });
delete obj.password;
return obj;
};


export const User = mongoose.model('User', userSchema);
export const ROLES = ROLE;