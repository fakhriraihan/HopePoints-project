import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './news.css';
import NewsPage from '../../Pages/NewsPage/NewsPage';

// const News = () => {
//   return (
//     <>
//       <div className="newsUpdate">
//         <ul>
//           <li>
//             <a href="#">Perempuan</a>
//           </li>
//           <li>
//             <a href="">Kekerasan</a>
//           </li>
//           <li>
//             <a href="">Anak</a>
//           </li>
//           <li>
//             <a href="">Tips</a>
//           </li>
//           <li>
//             <a href="">Penanganan</a>
//           </li>
//         </ul>
//       </div>
//       <div className="card mb-3">
//         <div className="row g-0">
//           <div className="col-md-4">
//             <img src="..." className="img-fluid rounded-start" alt="..." />
//           </div>
//           <div className="col-md-8">
//             <div className="card-body">
//               <h5 className="card-title">Perempuan</h5>
//               <p className="card-text">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex delectus similique quidem quia ea quam adipisci, est ipsa corporis, rerum, ab mollitia minima soluta sapiente consectetur eligendi nihil reiciendis cum?
//                 Praesentium assumenda, cumque repellat ipsam a eligendi facilis tempora! Sapiente maxime velit amet unde architecto, quod culpa quis quo cum consectetur itaque quas at error doloremque! Cum sed quidem impedit!
//               </p>
//               <p className="card-text">
//                 <small className="text-muted">Last updated 3 mins ago</small>
//               </p>
//               <button>Baca Selengkapnya</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card mb-3">
//         <div className="row g-0">
//           <div className="col-md-4">
//             <img src="..." className="img-fluid rounded-start" alt="..." />
//           </div>
//           <div className="col-md-8">
//             <div className="card-body">
//               <h5 className="card-title">Perempuan</h5>
//               <p className="card-text">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex delectus similique quidem quia ea quam adipisci, est ipsa corporis, rerum, ab mollitia minima soluta sapiente consectetur eligendi nihil reiciendis cum?
//                 Praesentium assumenda, cumque repellat ipsam a eligendi facilis tempora! Sapiente maxime velit amet unde architecto, quod culpa quis quo cum consectetur itaque quas at error doloremque! Cum sed quidem impedit!
//               </p>
//               <p className="card-text">
//                 <small className="text-muted">Last updated 3 mins ago</small>
//               </p>
//               <button>Baca Selengkapnya</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card mb-3">
//         <div className="row g-0">
//           <div className="col-md-4">
//             <img src="..." className="img-fluid rounded-start" alt="..." />
//           </div>
//           <div className="col-md-8">
//             <div className="card-body">
//               <h5 className="card-title">Perempuan</h5>
//               <p className="card-text">
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex delectus similique quidem quia ea quam adipisci, est ipsa corporis, rerum, ab mollitia minima soluta sapiente consectetur eligendi nihil reiciendis cum?
//                 Praesentium assumenda, cumque repellat ipsam a eligendi facilis tempora! Sapiente maxime velit amet unde architecto, quod culpa quis quo cum consectetur itaque quas at error doloremque! Cum sed quidem impedit!
//               </p>
//               <p className="card-text">
//                 <small className="text-muted">Last updated 3 mins ago</small>
//               </p>
//               <button>Baca Selengkapnya</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const News = ({ title, description, url, urlToImage }) => {
  return (
    <div className="news-app">
      <div className="news-item">
        <img className="news-img" src={urlToImage} alt={urlToImage} />
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default News;
