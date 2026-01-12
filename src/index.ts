import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import categoryRouter from './routes/category';
import productRouter from './routes/product';
import productVariantRouter from './routes/productVariant';
import productPhotoRouter from './routes/productPhoto';
import productCommentRouter from './routes/productComment';
import userAddressRouter from './routes/userAddress';
import cartRouter from './routes/cart';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// urlencoded formatındaki requestler 
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/user', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/variants', productVariantRouter);
app.use('/api/photos', productPhotoRouter);
app.use('/api/comments', productCommentRouter);
app.use('/api/addresses', userAddressRouter);
app.use('/api/cart', cartRouter);

// Test endpoint (health check)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running!'
    });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});