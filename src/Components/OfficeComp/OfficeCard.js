import Card from 'react-bootstrap/Card';
import './office.css';

function OfficeCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/assets/hero/hero.png" />
      <Card.Body>
        <Card.Title>Nama Kantor</Card.Title>
        <Card.Text>Temukan Kantor Terdekatmu !</Card.Text>
        <Card.Link href="detail.js">Cek Kantor</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default OfficeCard;
