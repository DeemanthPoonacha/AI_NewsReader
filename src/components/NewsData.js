import React, { useEffect, useState } from 'react'
import {getNews} from '../service/getNews';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function NewsData() {
    const ALAN_KEY = 'bbd27d33d3c2e837fba261de43d0db1d2e956eca572e1d8b807a3e2338fdd0dc/stage';
    const [newsData, setNewsData] = useState([]);
    const [selectedOption, setSelectOption] = useState('');
    const getAllNews = async() => { 
        let data = await getNews(selectedOption);
        setNewsData(data.data.articles);
    };

    useEffect(() => {
    alanBtn({
        key: ALAN_KEY,
        onCommand: (commandData) => {
            console.log(commandData.data);
            setSelectOption(commandData.data) 
            const $select = document.querySelector('#selectCat');
            $select.value = commandData.data;
        }
    });
    }, []);
    useEffect(() => {
        getAllNews();
    }, [selectedOption]);

    console.log(newsData);

    const SelectCategory = (event) => {
        setSelectOption(event.target.value);
    };

    // const shortenContent = (content, maxLength) => {
    //     console.log(typeof content);
    //     //trim the string to the maximum length
    //     var trimmedString = content//.substring(0, maxLength);

    //     //re-trim if we are in the middle of a word
    //     // trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    //     return trimmedString;
    // };

    return (
        <div className='container main g-3'>
            <div className='row g-3'>
                <h1>ALAN NEWS</h1>
            </div>
            <div className='row g-3'>
                <div className='col-12'>
                    <select class="form-select"
                        onChange={SelectCategory}
                        id="selectCat"
                        value={selectedOption}>
                        <option value="general">General</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="science">Science</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>  
                        <option value="sports">Sports</option>
                    </select>
                </div> 
            </div>
            <div className='row g-3'>
                {newsData?.map((news) => {
                    return (
                        <div className="col-md-6 col-lg-4 ">
                            <div className="card">
                                <img src={news?.urlToImage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h6 className="card-title"><strong>{news?.title}</strong></h6>
                                    <p className="card-text">{news?.content}</p>
                                    <div className='space'>
                                        <p>Author: {news?.author?news?.author:'N/A'}</p>
                                        {news?.publishedAt?<p>Date: {moment(news?.publishedAt).format('LL')}</p>:<p></p>}
                                    </div>
                                    <a href={news?.url} target='_blank' className="card-link">Read more...</a>
                                </div>
                            </div>
                        </div>);
                })}
            </div>
        </div>);
    // (
    //     <div className='main'>
    //         <div className='grid-main'>
    //             {newsData?.map((news) => {
    //                 return <div className='grid-child'>
    //                     <img className='news-image' src={news?.urlToImage} />
    //                     <h5>{news?.title}</h5>
    //                     <p>{ news?.content}</p>
    //                     <a href={news?.url} target='_blank'>read more...</a>
    //                 </div>
    //             })}
    //         </div>
    //     </div>
    // )
}
