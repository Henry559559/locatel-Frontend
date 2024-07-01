import Layout from "../../hocs/Layout";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { 
    get_product, 
    get_related_products
} from "../../redux/actions/products";
import { useEffect, useState } from "react";
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'
import ImageGallery from "../../components/product/ImageGallery";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductDetail = ({
    get_product,
    get_related_products,
    product
}) => {
    const params = useParams();
    const productId = params.productId;

    useEffect(() => {
        window.scrollTo(0,0);
        get_product(productId);
        get_related_products(productId);
    }, [get_product, get_related_products, productId]);

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        <ImageGallery photo={ product && product.photo} />
                        {/* Product info */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900">{product && product.valor}</p>
                            </div>
                            <div className="mt-6">
                            <div className="text-base text-gray-700 space-y-6">
                                    <div>iva = {product && product.iva}%</div>
                            </div>
                             <h3 className="sr-only">Description</h3>
                            <div
                                className="text-base text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{ __html: product && product.descripcion}}
                            />
                            </div>
                            
                            <form className="mt-6">
                                <div className="mt-10 flex sm:flex-col1">
                                    <button
                                        type="submit"
                                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                                        Add to Card
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                    >
                                        <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Add to favorites</span>
                                    </button>
                                </div>
                            </form>
                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

const mapStateToProps = state => ({
    product: state.Products.product
});

export default connect(mapStateToProps, {
    get_product,
    get_related_products
})(ProductDetail);
