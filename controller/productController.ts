import { Request, Response } from "express";
import prisma from "../utils/prismaClient";

exports.createProduct = async (req: Request, res: Response) => {
  const { name, price, description, categoryId } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        userId: req.user.id,
      },
      include: {
        colors: true, // Include the related product colors in the response
        reviews: true, // Include the related user reviews in the response
        User: true, // Include the related user (if any) in the response
      },
    });

    return res.status(200).json({
      message: "Created Successfully",
      prodcut: newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        User: true,
      },
    });
    return res.status(200).json({
      product: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateProduct = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: data?.id,
      },
      data: {},
    });
    return res.status(200).json({
      message: "Updated Successfully",
      updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
