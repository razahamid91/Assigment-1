import { useState} from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const handleOrderDetails = selectedId => {
    const selectedDetails = mockData.results.find((order) => {
      return order["&id"] === selectedId
    })

    const selectedTimeStamp = timestamps.results.find((timestamp) => {
      return timestamp["&id"] === selectedId;
    });

    setSelectedOrderDetails(selectedDetails);
    setSelectedOrderTimeStamps(selectedTimeStamp);
  }

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${mockData.results.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails.executionDetails}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps.timestamps}
            key={selectedOrderDetails["&key"]}
            title="Selected Order Timestamps"
          />
        </div>
        <List handleOrderDetails={handleOrderDetails} searchText={searchText} rows={mockData.results}  orderDetails={timestamps.results} currency={currency} />
      </div>
    </div>
  );
};

export default Dashboard;