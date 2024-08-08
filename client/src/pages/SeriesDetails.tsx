import { useEffect, useState } from 'react';
import { Smiskis } from '../../../server/lib/data';
import { useNavigate, useParams } from 'react-router-dom';

export function SeriesDetails() {
  const [seriesDetails, setSeriesDetails] = useState<Smiskis[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState<unknown>();
  const { seriesId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSeriesDetails() {
      try {
        const response = await fetch(`/api/series/${seriesId}/smiskis`);
        if (!response.ok) throw new Error(`Response status ${response.status}`);
        const smiskis = (await response.json()) as Smiskis[];
        setSeriesDetails(smiskis);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    }
    getSeriesDetails();
  }, [seriesId]);

  function handleAddQuantity() {
    const addQuantity = quantity + 1;
    setQuantity(addQuantity);
  }

  function handleSubtractQuantity() {
    let subtractQuantity = quantity - 1;
    if (subtractQuantity < 1) {
      subtractQuantity = 1;
    }
    setQuantity(subtractQuantity);
  }

  async function handleAddToCart() {
    try {
      const cartCheckoutResponse = await fetch('/api/shoppingCartItems');
      if (!cartCheckoutResponse.ok)
        throw new Error(`Response status ${cartCheckoutResponse.status}`);
      const cartItems = (await cartCheckoutResponse.json()) as {
        seriesId: number;
        quantity: number;
        shoppingCartItemsId: number;
      }[];
      const existingCartItems = cartItems.find(
        (item) => item.seriesId === Number(seriesId)
      );
      if (existingCartItems) {
        const newQuantity = existingCartItems.quantity + quantity;
        const updateCartCheckoutResponse = await fetch(
          `/api/shoppingCartItems/${existingCartItems.shoppingCartItemsId}`,
          {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
          }
        );
        if (!updateCartCheckoutResponse.ok)
          throw new Error(
            `Response status ${updateCartCheckoutResponse.status}`
          );
      } else {
        const imageUrl = seriesDetailsBanner(seriesId);
        const response = await fetch('/api/shoppingCartItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            seriesId: seriesId,
            quantity: quantity,
            imageUrl: imageUrl,
          }),
        });
        if (!response.ok) throw new Error(`Response status ${response.status}`);
      }
      alert('Added to cart!');
    } catch (err) {
      setErr(err);
    }
  }

  const seriesDetailsBanner = (seriesId: string | undefined) => {
    switch (seriesId) {
      case '1':
        return '/images/series1cover2.webp';
      case '2':
        return '/images/series2cover2.png';
      case '3':
        return '/images/series3cover2.webp';
      case '4':
        return '/images/series4cover22.webp';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl bg-purple-200">
        Loading...
      </div>
    );
  }
  if (err) {
    return (
      <div>Error! {err instanceof Error ? err.message : 'Unknown Error'}</div>
    );
  }

  return (
    <div className="grid min-h-screen p-4 bg-purple-200">
      <button
        onClick={() => navigate('/series')}
        className="absolute px-2 py-1 mt-4 text-xl text-black bg-purple-100 rounded top-12 left-4">
        Back
      </button>
      <div className="flex flex-col p-4 md:flex-row">
        <div className="w-full pr-4 md:w-1/3">
          <div className="container mx-auto ">
            <img
              src={seriesDetailsBanner(seriesId)}
              alt={`series ${seriesId} banner`}
              className="w-full h-auto mt-6 mb-6"
            />
            <div className="p-3 mt-10 text-center md:text-left">
              <div className="mb-2 text-2xl ">$10.00 USD (1 Blind Box)</div>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 text-white bg-pink-500 rounded">
                Add to Cart
              </button>
              <div className="flex items-center justify-center mt-4 md:justify-start">
                <button
                  onClick={handleSubtractQuantity}
                  className="px-2 bg-white">
                  -
                </button>
                <span className="px-2 mx-1 bg-white">{quantity}</span>
                <button onClick={handleAddQuantity} className="px-2 bg-white">
                  +
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                *Blind boxes are shipped randomly
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 ">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {seriesDetails.map((smiskis) => (
                <div
                  key={smiskis.smiskisId}
                  className="max-w-xs p-5 mx-auto bg-white rounded shadow">
                  <img
                    src={smiskis.imageUrl}
                    alt={smiskis.pose}
                    className="object-cover mx-auto w-30 h-30"
                  />
                  <h2 className="mt-2 text-lg font-medium text-center md:text-left">{`Body Type: ${smiskis.bodyType}`}</h2>
                  <p className="text-center text-gray-600 md:text-left">
                    {smiskis.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
