import { useState, useEffect } from 'react';
import {ThemeProvider} from 'styled-components'
import {getConfig} from '../api/configApi'
import axios from 'axios';

const SITE_ID = 1

const DEFAULT_CONFIG = {
    "fontFamily": "'Poppins', sans-serif",
    "color":{"defaultColor": "black","primaryColor": "#ED1C25", "secondaryColor": "white" },
    "fontSize": "16px",
    "logo": "",
    "companyName": "Smart Bim",
    "button" : {
        "backgroundColor": "dodgerblue",
        "color": "white"
    },
    "header": {
        "backgroundColor": "grey",
        "color": "white"
    },
    "text" : {
        "color": "black"
    }
}
function ConfigurationProvider({ children }) {
    const [themeConfig, setThemeConfig] = useState(DEFAULT_CONFIG);

    useEffect(() => {

           getConfig(SITE_ID).then(res => {
               setThemeConfig(res.data);
           })
    }, []);

    if(!themeConfig) <div> loading theme...</div>
    console.log(themeConfig, 'theme')
    return (
        <ThemeProvider theme={themeConfig}>
            {children}
        </ThemeProvider>
    );
}

export default ConfigurationProvider;
