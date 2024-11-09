import { AppBar, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";

export default function LalosTabs({ labels = [], components = [], setIndex, disabled = false, activeTab = "1" }) {
    const [value, setValue] = useState(activeTab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickTab = (index) => () => {
        if (setIndex) setIndex(index);
    };

    useEffect(() => {
        setValue(activeTab);
    }, [activeTab]);

    return (
        <TabContext value={value}>
            <AppBar position="static" color="default" elevation={2}>
                <TabList onChange={handleChange} scrollButtons="auto" variant="fullWidth">
                    {labels.map((label, index) => (
                        <Tab
                            key={`tab-${index}`}
                            disabled={disabled}
                            label={label}
                            value={(index + 1).toString()}
                            onClick={handleClickTab(index)}
                        />
                    ))}
                </TabList>
            </AppBar>
            {components.map((component, index) => (
                <TabPanel key={`panel-${index}`} value={(index + 1).toString()}>
                    {component}
                </TabPanel>
            ))}
        </TabContext>
    );
}
