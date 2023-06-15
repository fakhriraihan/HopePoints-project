import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { GetReport } from '../../Utils/crudData';

const JumlahKasus = () => {
  const [reports, setReports] = useState([]);

  const getFisikReportsCount = () => {
    const processedReports = reports.filter(
      (report) => report.kekerasanFisik === true
    );
    return processedReports.length;
  };

  const getPsikisReportsCount = () => {
    const doneReports = reports.filter(
      (report) => report.kekerasanPsikis === true
    );
    return doneReports.length;
  };

  const getSeksualReportsCount = () => {
    const canceledReports = reports.filter(
      (report) => report.kekerasanSeksual === true
    );
    return canceledReports.length;
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: 'Kekerasan Fisik',
      content: getFisikReportsCount(),
    },
    {
      title: 'Kekerasan Psikis',
      content: getPsikisReportsCount(),
    },
    {
      title: 'Kekerasan Seksual',
      content: getSeksualReportsCount(),
    },
  ];

  return (
    <>
      <h3 className='carousel-title'>Jumlah Kekerasan Yang Terjadi</h3>
      <Container className='carousel-container'>
        <div
          className='carousel-wrapper'
          style={{ transform: `translateZ(-${activeSlide * 500}px)` }}
        >
          <Row>
            <Col>
              <button
                className='carousel-button prev'
                onClick={() =>
                  setActiveSlide(
                    (activeSlide - 1 + slides.length) % slides.length
                  )
                }
              >
                <i className='fa-solid fa-chevron-left'></i>
              </button>
            </Col>
            <Col xs={8}>
              <Card className='carousel-slide'>
                <h2>{slides[activeSlide].title}</h2>
                <p>{slides[activeSlide].content}</p>
              </Card>
            </Col>
            <Col>
              <button
                className='carousel-button next'
                onClick={() =>
                  setActiveSlide((activeSlide + 1) % slides.length)
                }
              >
                <i className='fa-solid fa-chevron-right'></i>
              </button>
            </Col>
          </Row>
        </div>
      </Container>
      <GetReport setReports={setReports} />
    </>
  );
};

export default JumlahKasus;
