import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { getOrderAdmin, getUser } from "../../api/admin";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip
);

const FromDashboard = () => {
  const token = useStore((state) => state.token);
  const getProduct = useStore((state) => state.getProduct);
  const products = useStore((state) => state.products);

  const [userCount, setUserCount] = useState(0); // Users ทั้งหมด
  const [disabledUserCount, setDisabledUserCount] = useState(0); // Users ที่ enabled: false
  const [outOfStockCount, setOutOfStockCount] = useState(0); // Products ที่ quantity: 0

  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});

  useEffect(() => {
    handleGetUser(token);
    getProduct(50); // ดึง Products สูงสุด 50 รายการ
    handleGetOrder(token);
  }, []);

  const handleGetUser = async (token) => {
    try {
      const res = await getUser(token);
      const allUsers = res.data;
      const disabledUsers = allUsers.filter((user) => !user.enabled); // นับ Users ที่ enabled: false
      setUserCount(allUsers.length);
      setDisabledUserCount(disabledUsers.length);
    } catch (error) {
      console.log("🚀 ~ handleGetUser ~ error:", error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const outOfStockProducts = products.filter(
        (product) => product.quantity === 0
      );
      setOutOfStockCount(outOfStockProducts.length); // นับ Products ที่ quantity: 0
    }
  }, [products]);

  const handleGetOrder = async (token) => {
    try {
      const res = await getOrderAdmin(token);
      const ordersData = res.data;

      // สร้างข้อมูลกราฟ Bar Chart จาก ordersData
      const groupedData = ordersData.reduce((acc, order) => {
        const date = new Date(order.created).toLocaleDateString("en-GB"); // แปลงวันที่เป็น dd/mm/yyyy
        const status = order.orderStatus;

        if (!acc[date])
          acc[date] = {
            Processing: 0,
            Completed: 0,
            Cancel: 0,
            "Not Process": 0,
          };
        acc[date][status] += 1;
        return acc;
      }, {});

      const labels = Object.keys(groupedData); // วันที่
      const datasets = [
        {
          label: "Processing",
          data: labels.map((date) => groupedData[date]["Processing"]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Completed",
          data: labels.map((date) => groupedData[date]["Completed"]),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Cancel",
          data: labels.map((date) => groupedData[date]["Cancel"]),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Not Process",
          data: labels.map((date) => groupedData[date]["Not Process"]),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ];

      setChartData({ labels, datasets });

      // สร้างข้อมูล Line Chart จาก ordersData
      const dailyTotal = ordersData.reduce((acc, order) => {
        if (order.orderStatus !== "Cancel") {
          // หักยอดที่ status เป็น Cancel
          const date = new Date(order.created).toLocaleDateString("en-GB"); // แปลงวันที่เป็น dd/mm/yyyy
          if (!acc[date]) acc[date] = 0;
          acc[date] += order.cartTotal;
        }
        return acc;
      }, {});

      const lineLabels = Object.keys(dailyTotal); // วันที่
      const lineDataset = {
        label: "Daily Order Total",
        data: Object.values(dailyTotal), // ยอดเงินรวมต่อวัน
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      };

      setLineChartData({ labels: lineLabels, datasets: [lineDataset] });
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mx-auto mt-3 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Card: Total Users */}
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-800 mt-2">{userCount}</p>
        </div>
        {/* Card: Disabled Users */}
        <div className="p-4 bg-red-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700">Disabled Users</h2>
          <p className="text-4xl font-bold text-red-800 mt-2">
            {disabledUserCount}
          </p>
        </div>
        {/* Card: Total Products */}
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">
            Total Products
          </h2>
          <p className="text-4xl font-bold text-green-800 mt-2">
            {products.length}
          </p>
        </div>
        {/* Card: Out of Stock Products */}
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-yellow-700">
            Out of Stock Products
          </h2>
          <p className="text-4xl font-bold text-yellow-800 mt-2">
            {outOfStockCount}
          </p>
        </div>

        {/* order chart */}
        <div>
          {chartData.labels ? (
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Order Status Overview
              </h2>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                    title: {
                      display: true,
                      text: "Order Status by Date",
                      font: { size: 16 },
                    },
                  },
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true },
                  },
                }}
              />
            </div>
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
        {/* line chart */}
        <div>
          {lineChartData.labels ? (
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Daily Order income
              </h2>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                    title: {
                      display: true,
                      text: "Daily Revenue from Orders",
                      font: { size: 16 },
                    },
                  },
                  scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          ) : (
            <p>Loading line chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FromDashboard;
