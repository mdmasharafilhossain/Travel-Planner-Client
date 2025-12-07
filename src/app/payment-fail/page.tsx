import Link from "next/link";


const PaymentCancelPage = () => {
    return (
        <div>
            <h1>Payment Failed</h1>
            <Link href="/user/payment">Try again...</Link>
        </div>
    );
};

export default PaymentCancelPage;