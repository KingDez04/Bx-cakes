const OrdersTable = ({ orders }) => {
  const getStatusBgColor = (status) => {
    switch (status) {
      case "Pending Confirmation":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-gray-200 text-gray-700";
      case "Completed":
      case "Completes":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="font-main bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold">
                Order ID
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden md:table-cell">
                Order Date
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden lg:table-cell">
                Delivery Date
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold">
                Status
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden sm:table-cell">
                Details
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden xl:table-cell">
                Categories
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden xl:table-cell">
                Customer ID
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold">
                Customer
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden lg:table-cell">
                Contact
              </th>
              <th className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs lg:text-sm font-semibold hidden xl:table-cell">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm">
                  {order.orderId}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm hidden md:table-cell">
                  {order.orderDate}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm hidden lg:table-cell">
                  {order.deliveryDate}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3">
                  <span
                    className={`inline-block px-1.5 md:px-2 lg:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] lg:text-xs font-medium whitespace-nowrap ${getStatusBgColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 hidden sm:table-cell">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-[10px] md:text-xs lg:text-sm text-orange-600 truncate max-w-20 md:max-w-[120px] lg:max-w-[150px]">
                      {order.details}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 shrink-0">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 hidden xl:table-cell">
                  <div className="flex gap-1">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                      Female
                    </span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
                      Birthday
                    </span>
                  </div>
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm hidden xl:table-cell">
                  {order.customerId}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm">
                  {order.customerName}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm hidden lg:table-cell">
                  {order.customerContact}
                </td>
                <td className="px-2 md:px-3 lg:px-4 py-2 md:py-3 text-[10px] md:text-xs lg:text-sm hidden xl:table-cell">
                  {order.customerEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
