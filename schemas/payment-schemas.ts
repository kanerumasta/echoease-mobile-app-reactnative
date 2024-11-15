// user = models.ForeignKey(USER,on_delete=models.CASCADE, null=True, blank=True) #payer or receiver
// title = models.TextField(null=True, blank=True)
// payment_reference = models.CharField(max_length=15, blank=True)
// payment_status = models.CharField(max_length=50, default='pending')
// booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="payments")
// amount = models.DecimalField(max_digits=10, decimal_places=2)
// net_amount = models.DecimalField(max_digits=10, decimal_places=2)
// payment_date = models.DateTimeField(auto_now_add=True)
// payment_method = models.CharField(max_length=50, null=True, blank=True)
// payer_channel = models.CharField(max_length=50, null=True, blank=True)
// payer_email = models.CharField(max_length=50, null=True, blank=True)
// is_refunded = models.BooleanField(default=False)
// refund_transaction_id = models.CharField(max_length=255, null=True, blank=True)

import { z } from "zod";

export const PaymentSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    payment_reference: z.string().optional(),
    payment_status: z.string(),
    booking: z.number(),
    amount: z.number(),
    net_amount: z.number(),
    payment_date: z.date(),
    payment_method: z.string().optional(),
    payer_channel: z.string().optional(),
    payer_email: z.string().optional(),
    is_refunded: z.boolean(),
})
