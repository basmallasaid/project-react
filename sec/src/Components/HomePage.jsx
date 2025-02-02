import React from 'react';
import Footer from './Footer';
import styles from "../Styles/Style.module.css";
const Home = () => {
  return (
    <>
      <div className={styles.back}>
     {/* <h1 className={styles.hometext}>Welcome to Essence</h1>  */}
     
      </div>
     

      <h2 className={styles.BestsellerTitle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-gem"
          viewBox="0 0 16 16"
          style={{ verticalAlign: "middle", marginRight: "10px" }}
        >
          <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6zm11.386 3.785-1.806-2.41-.776 2.413zm-3.633.004.961-2.989H4.186l.963 2.995zM5.47 5.495 8 13.366l2.532-7.876zm-1.371-.999-.78-2.422-1.818 2.425zM1.499 5.5l5.113 6.817-2.192-6.82zm7.889 6.817 5.123-6.83-2.928.002z" />
        </svg>
        Best SELLER
      </h2>
      <div className="row align-items-center" style={{ margin: "15px 10px" }}>
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <img
              src="/photo/coco_Perfume.jpeg"
              alt="About Us"
              className={styles.BestsellerImage}
            />
          </div>
        </div>
        <div className="col-md-6" style={{ margin: "15px 0px" }}>
          <div className={styles.BestselleUsSection}>
            <h2 className={styles.BestsellerTitle}> Coco Perfume</h2>
            <p className={styles.BestsellerParagraph}>
              Welcome to the world of Coco Perfume, where sophistication and
              elegance meet. Our Coco Perfume is a bestseller for a reason: it
              embodies timeless luxury and refinement. Crafted with a blend of
              exquisite floral and sensual notes, Coco Perfume offers a
              captivating fragrance that leaves a lasting impression. Whether
              you're dressing up for a special occasion or seeking to add a
              touch of elegance to your daily routine, Coco Perfume is the
              perfect choice. Experience the allure of Coco and indulge in a
              fragrance that defines your unique style.
            </p>
          </div>
        </div>
      </div>
      <div className="row align-items-center" style={{ margin: "15px 10px" }}>
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <img
              src="/photo/Ruby Stud Earrings.jpg"
              alt="About Us"
              className={styles.BestsellerImage}
            />
          </div>
        </div>
        <div className="col-md-6" style={{ margin: "20px 0px" }}>
          <div className={styles.BestselleUsSection}>
            <h2 className={styles.BestsellerTitle}> Ruby Stud Earrings</h2>
            <p className={styles.BestsellerParagraph}>
              "These elegant Ruby Stud Earrings feature stunning, vibrant red
              rubies set in a classic stud design. Perfect for adding a touch of
              sophistication to any outfit."
            </p>
          </div>
        </div>
      </div>
      <div>
      </div>
      <hr/>
      <div className={styles.FooterSpacing}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
