import React, { Component } from 'react';

import PrivateHeader from './privateheader';

//statless functional component
export default Dashboard = () => {
    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                Dashboard page content.
            </div>
        </div>
    );
}

// export default class Link extends Component {
//     render() {
//         return (
//             <div>
//                 <PrivateHeader title="My links" />
//                 <LinksList />
//                 <AddLink/>
//             </div>
//         );
//     }
// }