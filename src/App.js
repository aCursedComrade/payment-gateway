import React from "react";
import "./App.css";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("d"))

  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: searchParams.get("d"),
          },
        },
      ],
    });
  }

  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(order));
    return order;
  }

  function _onError(err) {
    console.log(err);
    let errObj = {
      err: err,
      status: "FAILED",
    };
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(JSON.stringify(errObj));
  }

  return (
    <div className="app">
      <div className="wrapper">
        {searchParams.get("d") ? (
          <PayPalScriptProvider options={{"client-id":"AbgJVyt5-riLwpR3czPVA_yeTvxqTUTjJDnR2lQwU9J6WdK3e24WlCe9ow9UK0Z-idzlBm-MPnvZ2uSq"}}>
            <PayPalButtons
              createOrder={(data, actions) => _createOrder(data, actions)}
              onApprove={(data, actions) => _onApprove(data, actions)}
              onCancel={() => _onError("Canceled")}
              onError={(err) => _onError(err)}
            />
          </PayPalScriptProvider>
        ) : (
          <h2>Did you forget something?</h2>
        )}
      </div>
    </div>
  );
}

export default App;
