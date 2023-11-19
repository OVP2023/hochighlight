import React, { useState } from 'react';


function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function New(Component){ 
    return class extends React.Component{       
        render(){
            if (this.props.views > 1000) {
               return(
                 <>                   
                   <div className="wrap-item wrap-item-new">
                     <span className="label">New!</span>
                     {this.props.children}
                   </div>
                   <Component {...this.props} />
                 </>
               )    
            }else{
                return <Component {...this.props} />
            }
        }
    }
}
const ArticleNew=New(Article)

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};


function Popular(Component){
    return class extends React.Component{       
        render(){
            if (this.props.views > 1000) {
              return (
                <>
                  <div className="wrap-item wrap-item-popular">
                    <span className="label">Popular!</span>
                      {this.props.children}
                  </div>
                  <Component {...this.props} />
                </>
              )
            }else{
              return  <Component {...this.props} /> 
            }
        }
    }
}        

const VideoPopular=Popular(Video)



function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoPopular {...item} />
                );

            case 'article':
                return (
                    <ArticleNew {...item} />
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}