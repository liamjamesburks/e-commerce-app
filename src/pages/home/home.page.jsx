import React, {Component} from 'react';

import CategoryList from "../../components/category-list.component/category-list.component";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'categories': [
                {
                    "id": 1,
                    "title": "hats",
                    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
                },
                {
                    "id": 2,
                    "title": "jackets",
                    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
                },
                {
                    "id": 3,
                    "title": "sneakers",
                    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
                },
                {
                    "id": 4,
                    "title": "womens",
                    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
                },
                {
                    "id": 5,
                    "title": "mens",
                    "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
                },
            ]
        }
    }

    render() {
        console.log('render');

        return (
            <CategoryList categories={ this.state.categories }/>
        );
    }
}

export default Home;
