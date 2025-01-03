import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DonationSummaryProps {
  amount: number;
}

export const DonationSummary = ({ amount }: DonationSummaryProps) => {
  return (
    <Card className="shadow-lg sticky top-24 backdrop-blur-sm bg-white/80 border-gray-100/20">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Donation Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Donation</span>
          <span className="font-medium">${amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Processing Fee</span>
          <span className="font-medium">${(amount * 0.029).toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${(amount * 1.029).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 bg-gradient-to-b from-secondary/5 to-primary/5 rounded-b-lg">
        <div className="space-y-2 w-full">
          <p className="font-medium text-primary">Why donate?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Support medical research in Haiti</li>
            <li>Improve healthcare quality</li>
            <li>Train the next generation of doctors</li>
            <li>Contribute to medical innovation</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
};