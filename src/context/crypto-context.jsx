import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  crypto: [],
  assets: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assetList, result) {
    return assetList.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assetsData = localStorage.getItem("assets");
      let parsedAssets = assetsData ? JSON.parse(assetsData) : await fetchAssets();
      if (!parsedAssets) parsedAssets = [];
      localStorage.setItem("assets", JSON.stringify(parsedAssets));
      setAssets(mapAssets(parsedAssets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prevAssets) => {
      const existingIndex = prevAssets.findIndex(
        (asset) => asset.id === newAsset.id
      );
      let updatedAssets;
      if (existingIndex !== -1) {
        const existingAsset = prevAssets[existingIndex];
        const updatedAmount = existingAsset.amount + newAsset.amount;
        const updatedPrice =
          (existingAsset.amount * existingAsset.price +
            newAsset.amount * newAsset.price) /
          updatedAmount;
        const updatedAsset = {
          ...existingAsset,
          amount: updatedAmount,
          price: updatedPrice,
          date: newAsset.date,
        };
        updatedAssets = [...prevAssets];
        updatedAssets[existingIndex] = updatedAsset;
      } else {
        updatedAssets = [...prevAssets, newAsset];
      }
      localStorage.setItem("assets", JSON.stringify(updatedAssets));
      return mapAssets(updatedAssets, crypto);
    });
  }

  function removeAsset(assetId) {
    setAssets((prevAssets) => {
      const updatedAssets = prevAssets.filter((asset) => asset.id !== assetId);
      localStorage.setItem("assets", JSON.stringify(updatedAssets));
      return mapAssets(updatedAssets, crypto);
    });
  }

  return (
    <CryptoContext.Provider value={{ crypto, assets, loading, addAsset, removeAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
