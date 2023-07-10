const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwtSecret = require("../../config")

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true,"first name is required"],
            maxlength: [20,"20 char limit"],
            minlength: [1,"atleast 1 char"]
        },
        lastName: {
            type: String,
            required: [true,"last name is required"],
            maxlength: [20,"20 char limit"],
            minlength: [1,"atleast 1 char"]
        },
        email: {
            type: String,
            required : [true,"Enter email address!"],
            validate: {
                validator: validator.isEmail,
                message: "Invalid email address"
            }
        },
        role: {
            type: String,
            required: [true, "Role required"],
            enum: {
                values: ["User","Admin"],
                message: "Unknown",
                default: "User"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4,"Password must be atleast 4 characters"]
          },
        confirmPassword: {
            type: String,
            required: [true,"repeat password"],
            validate: {
                validator: function (value){
                    return this.password === value
                }
            },
            minlength: [4,"minimum 4 characters"]
        },
        token: {
            type: String
        }
    },
    {
        writeConcern: {
            w: "majority",
            j: true,
        },
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
} );

userSchema.methods.checkPassword = async function (pinFromBody,password) {
    return await bcrypt.compare(pinFromBody, password)
};

userSchema.statics.findByToken = async function(token){
    var user = this;
    jwtSecret.verify(token,config.jwtSecret, function(err,decode){
        user.findone({"_id":decode, "token":token},function(err,user){
            if(err) return (err);
            return (user);
        })
    })
};






userSchema.virtual("admin", {
    ref: "Admin",
    localField: "_id",
    foreignField: "user",
    justOne: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;