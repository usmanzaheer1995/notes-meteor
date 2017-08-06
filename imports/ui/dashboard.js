import React, { Component } from 'react';

import PrivateHeader from './privateheader';
import NoteList from './notelist';

//statless functional component
export default Dashboard = () => {
    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                <NoteList/>
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