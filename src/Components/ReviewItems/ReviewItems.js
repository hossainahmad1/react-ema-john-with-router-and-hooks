import React from 'react';
import './ReviewItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItems = ({ product, handleRemoveItem }) => {
    // console.log(product);
    const { id, img, name, price, quantity, shipping } = product;
    return (
        <div className='review-items'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <h4 className='review-name'>{name}</h4>
                    <p>price:<span className='price-color'>${price}</span></p>
                    <p>price:<span className='price-color'>${shipping}</span></p>
                    <p>quantity:<small className='price-color'>{quantity}</small></p>
                </div>
                <div className='delete-container'>
                    <button onClick={() => handleRemoveItem(id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;
