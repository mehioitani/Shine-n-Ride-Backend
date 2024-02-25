import Order from "../models/orderModel.js";
import Service from "../models/serviceModel.js";
import mongoose from "mongoose";

const createOrder = async (req, res) => {
  try {
    const { deliveryAddress, services } = req.body;

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Please provide delivery address",
        status: 400,
      });
    }

    const errorMessages = [];

    const serviceChecks = services.map(async (service) => {
      const { serviceId, quantity } = service;
      console.log(`Checking serviceId: ${serviceId}`);
      const existingService = await Service.findById(serviceId);
      console.log(`Existing service: ${existingService}`);
      if (!existingService || existingService.quantity < quantity) {
        errorMessages.push(`Not available quantity for a service`);
      }
    });

    await Promise.all(serviceChecks);

    if (errorMessages.length > 0) {
      return res.status(400).json({
        success: false,
        message: "One or more services have insufficient quantity",
        errors: errorMessages,
        status: 400,
      });
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    const serviceUpdates = services.map(async (service) => {
      const { serviceId, quantity } = service;
      
      await Service.findByIdAndUpdate(serviceId, {
        $inc: { quantity: -quantity },
      });
    });

    await Promise.all(serviceUpdates);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create a new order",
      error: error.message,
      status: 500,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: error.message,
      status: 500,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
        status: 400,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the requested order",
      error: error.message,
      status: 500,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryAddress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
        status: 400,
      });
    }

    const existingOrder = await Order.findById(id);

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        status: 404,
      });
    }
    if (deliveryAddress) {
      const updatedAddress = {
        ...existingOrder.deliveryAddress,
        ...deliveryAddress,
      };
      req.body.deliveryAddress = updatedAddress;
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the order",
      error: error.message,
      status: 500,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID format",
        status: 400,
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the order",
      error: error.message,
      status: 500,
    });
  }
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
