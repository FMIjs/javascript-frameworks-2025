
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard! 🎉</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Statistics 📊</h2>
          <p>Total Users: 1,234 👥</p>
          <p>Active Sessions: 42 🔥</p>
        </div>
        <div className="dashboard-card">
          <h2>Recent Activity ⚡</h2>
          <ul>
            <li>New user registered 👋</li>
            <li>System update completed ✅</li>
            <li>Backup successful 💾</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
