import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";


function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };

}



const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMathod } = req.body
    if (orderItems && orderItems.length === 0) {
      throw new ApiError(400, "not oder items")
    }
    const itemsfromDb = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) }
    });



    const orderItemDB = orderItems.map((itemsfromCleint) => {
      const mathcingItemsFromDb = itemsfromDb.find((itemsfromDb) => itemsfromDb._id.toString() === itemsfromCleint._id)
      if (!mathcingItemsFromDb) {
        throw new ApiError(400, `product not found ${itemsfromCleint._id}`)
      }

      return {
        ...itemsfromCleint,
        product: itemsfromCleint._id,
        price: mathcingItemsFromDb.price,
        _id: undefined,
      };
    })

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(orderItemDB);

    const order = new Order({
      orderItems: orderItemDB,
      user: req.user._id,
      shippingAddress,
      paymentMathods,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save()
    res.status(200).json(
      new ApiResponse(201, createOrder, "create order was sussfully")
    )

  } catch (error) {
    console.log(error)
    throw new ApiError(400, `error : ${error.message}`)
  }


  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).populate("user", "id username");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const countTotalOrders = async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      res.json({ totalOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const calculateTotalSales = async (req, res) => {
    try {
      const orders = await Order.find();
      const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      res.json({ totalSales });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const calcualteTotalSalesByDate = async (req, res) => {
    try {
      const salesByDate = await Order.aggregate([
        {
          $match: {
            isPaid: true,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
            },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);

      res.json(salesByDate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const findOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "username email"
      );

      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const markOrderAsPaid = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const markOrderAsDelivered = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
})

export {  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,}


