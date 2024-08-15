import { useEffect, useState } from 'react';
import { Smiskis, Series } from '../../../server/lib/data';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../components/useCart';

export function SeriesDetails() {
  const [seriesDetails, setSeriesDetails] = useState<Smiskis[]>([]);
  const [seriesInfo, setSeriesInfo] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState<unknown>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateCart, cartItems } = useCart();

  useEffect(() => {
    async function getSeriesDetails() {
      try {
        const response = await fetch(`/api/series/${seriesId}/smiskis`);
        if (!response.ok) throw new Error(`Response status ${response.status}`);
        const smiskis = (await response.json()) as Smiskis[];
        setSeriesDetails(smiskis);

        const seriesResponse = await fetch(`/api/series/${seriesId}`);
        if (!seriesResponse.ok)
          throw new Error(`Response status ${seriesResponse.status}`);
        const seriesData = (await seriesResponse.json()) as Series;
        setSeriesInfo(seriesData);
      } catch (err) {
        setErr(err);
      } finally {
        setLoading(false);
      }
    }
    getSeriesDetails();
  }, [seriesId]);

  const seriesDetailsBanner = (seriesId: string | undefined) => {
    switch (seriesId) {
      case '1':
        return {
          primary: '/images/series1cover2.webp',
          secondary: '/images/series1blindbox.png',
        };
      case '2':
        return {
          primary: '/images/series2cover2.png',
          secondary: '/images/series2blindbox.png',
        };
      case '3':
        return {
          primary: '/images/series3cover2.webp',
          secondary: '/images/series3blindbox.png',
        };
      case '4':
        return {
          primary: '/images/series4cover22.webp',
          secondary: '/images/series4blindbox.png',
        };
      default:
        return {
          primary: '',
          secondary: '',
        };
    }
  };

  const bannerImages = seriesDetailsBanner(seriesId);
  const images = [bannerImages.primary, bannerImages.secondary];

  function handleAddQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleSubtractQuantity() {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }

  async function handleAddToCart() {
    try {
      const existingCartItems = cartItems?.find(
        (item) => item.seriesId === Number(seriesId)
      );
      if (!seriesInfo) {
        throw new Error('Series information not found.');
      }

      const price = seriesInfo.price;

      if (existingCartItems) {
        const newQuantity = existingCartItems.quantity + quantity;

        updateCart(existingCartItems.seriesId, newQuantity);
      } else {
        const imageUrl = bannerImages.primary;
        const response = await fetch('/api/shoppingCartItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            seriesId: seriesId,
            quantity: quantity,
            imageUrl: imageUrl,
            price: price,
          }),
        });
        if (!response.ok) throw new Error(`Response status ${response.status}`);

        const newItem = await response.json();
        addToCart({
          shoppingCartItemsId: newItem.shoppingCartItemsId,
          seriesId: Number(seriesId),
          quantity,
          imageUrl: imageUrl!,
          price: price,
        });
      }
      alert('Added to cart!');
    } catch (err) {
      setErr(err);
    }
  }

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
    <div className="grid p-4 bg-purple-200">
      <button
        onClick={() => navigate('/series')}
        className="absolute px-2 py-1 mt-4 text-xl text-black bg-purple-100 rounded top-12 left-4 hover:scale-105">
        Back
      </button>
      <div className="flex flex-col p-5 md:flex-row">
        <div className="w-full pr-4 md:w-1/3">
          <div className="container mx-auto">
            <div className="relative">
              <div className="object-cover w-full h-64">
                <img
                  src={images[currentImageIndex]}
                  alt={`series ${seriesId} banner`}
                  className="object-cover w-full "
                />
              </div>
              <div className="absolute left-0 flex flex-col ml-2 space-y-2 transform -translate-y-1/2 top-1/2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-black' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}></button>
                ))}
              </div>
            </div>
            <div className="p-3 mt-20 text-center md:text-left">
              <div className="mb-2 text-2xl ">{`$${seriesInfo?.price} USD (1 Blind Box)`}</div>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 text-white duration-300 bg-pink-500 rounded hover:scale-105">
                Add to Cart
              </button>
              <div className="flex items-center justify-center mt-4 md:justify-start">
                <button
                  onClick={handleSubtractQuantity}
                  className="px-3 bg-white">
                  -
                </button>
                <span className="px-3 mx-1 bg-white">{quantity}</span>
                <button onClick={handleAddQuantity} className="px-3 bg-white">
                  +
                </button>
              </div>
              <div className="mt-2 text-xl text-black">
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
