import { sendEmail } from '../config/email';
import { orderCancelledEmail, orderConfirmationEmail, orderShippedEmail, passwordResetEmail, welcomeEmail } from '../templates/email';
import { OrderWithRelations } from '../types';



export const sendWelcomeEmail = async (email: string, firstName: string) => {
    try {
        await sendEmail(email, 'Protein Shop\a Hoş Geldiniz!',
            welcomeEmail(firstName)
        )
    } catch (error) {
        console.error('[EmailService] Failed to send welcome email: ', error)
    }
}

export const sendOrderConfirmationEmail = async (order: OrderWithRelations) => {
    try {
        await sendEmail(
            order.user.email, `Siparişiniz Alındı - ${order.orderNumber}`,
            orderConfirmationEmail(order)
        )
    } catch (error) {
        console.error('[EmailService] Failed to send order confirmation email: ', error)
    }
};

export const sendOrderShippedEmail = async (order: OrderWithRelations) => {
    try {
        await sendEmail(
            order.user.email, `Siparişiniz Kargoya Verildi - ${order.orderNumber}`,
            orderShippedEmail(order)
        )
    } catch (error) {
        console.error('[EmailService] Failed to send order shipped email: ', error)
    }
}

export const sendOrderCancelledEmail = async (order: OrderWithRelations) => {
    try {
        await sendEmail(
            order.user.email,
            `Siparişiniz İptal Edildi - ${order.orderNumber}`,
            orderCancelledEmail(order)
        )
    } catch (error) {
        console.error('[EmailService] Failed to send order cancelled email: ', error)
    }
};

export const sendPasswordResetEmail = async (email: string, firstName: string, resetToken: string) => {
    try {
        await sendEmail(
            email,
            `Şifre Sıfırla Talebi`,
            passwordResetEmail(firstName, resetToken)
        )
    } catch (error) {
        console.error('[EmailService] Failed to send password reset email: ', error)
    }
}