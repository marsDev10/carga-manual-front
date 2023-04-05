// Hooks
import React, { useState, useEffect } from "react";

// Excel 
import { read, utils } from "xlsx";

// Google
import { google } from 'googleapis';

// Google Config 
import googleConfig from '../../config/googleConfig.json';
 
//Spínner
import { Watch } from  'react-loader-spinner'

function Form() {

  console.log(JSON);

  const auth = new google.auth.OAuth2(
    googleConfig.web.client_id,
    googleConfig.web.client_secret,
    "http://localhost:5173/"
  );
  
  
  const [fileData, setFileData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [contador, setContador] = useState(0);
  const [block, setBlock] = useState(false);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    if (fileData) {
      const workbook = read(fileData, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet, { header: 1 });
      setJsonData(data);
    }
  }, [fileData]);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const data = event.target.result;
      setFileData(data);
    };

    reader.readAsBinaryString(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setBlock(true);

    const keys = jsonData[0]; // Obtenemos las llaves del primer arreglo
    const values = jsonData.slice(1); // Obtenemos los valores de los demás arreglos

    const objects = values.map(array => { // Convertimos cada arreglo en un objeto
      return keys.reduce((obj, key, index) => {
        obj[key] = array[index];
        return obj;
      }, {});
    });

        let total = objects.length;
        setTotalData(total);
        let i = 0;

        console.log("Inicio el proceso!");
        const intervalData = setInterval(() => {

                console.log(objects[i]);
        
            if(i === total - 1){
                clearInterval(intervalData);
                setBlock(false);
                setContador(0);
            }
        
            i++;
            setContador(i);
        
        }, 1000);
}

  return (
    <>
    <form
        onSubmit={handleSubmit}
        className="flex flex-col p-1 gap-2">
        <input
        className="border"
        disabled={block}
        required
        onChange={handleFileUpload}
        type="file"/>
        <input
        className="border cursor-pointer p-1"
        type="submit"
        disabled={block}
        value={"Cargar"}/>
    </form>
    <div className="text-center text-4xl"> { contador } de { totalData } </div>
    <div className="flex justify-center items-center">
        { block && <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />
        }
    </div>
    </>
    

  );
}

export { Form } ;
