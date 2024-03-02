import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      // required: true,
      min: 0,
    },
    // paymentMethod: {
    //   type: String,
    //   required: true,
    //   enum: ["CreditCard", "CashOnDelivery"],
    //   default: "CashOnDelivery",
    // },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    deliveryAddress: {
      receiverName: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      building: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      addressDetails: {
        type: String,
      },
    },
    services: {
      type: [
        {
          serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
          },

        },
      ],
      validate: {
        validator: function (services) {
          return services.length > 0;
        },
        message: "At least one service is required.",
      },
    },
  },
  { timestamps: true }
);

orderSchema.pre("find", function (next) {
  this.populate(["services.serviceId"]);
  next();
});

orderSchema.pre("findOne", function (next) {
  this.populate(["services.serviceId"]);
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
