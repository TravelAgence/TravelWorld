import styled, { keyframes } from "styled-components";
import Lottie from "lottie-react";
import Slider from "react-slick";
import travelAnimation from "../../assets/aas.json";
import { FaCheckCircle, FaGlobe, FaHeadset, FaUserFriends } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Importation correcte des images
import img1 from "../../assets/images/gallery-01.jpg";
import img2 from "../../assets/images/gallery-04.jpg";
import img3 from "../../assets/images/gallery-02.jpg";

// ✅ Tableau des images
const images = [img1, img2, img3];

// Animation
const move = keyframes`
  0% { transform: translateY(-5px); }
  50% { transform: translateY(10px) translateX(10px); }
  100% { transform: translateY(-5px); }
`;

// Styled components
const AboutSection = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;

  .slick-slide img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Main = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #01579b;
  font-family: 'Playfair Display', serif;
  margin-top: 1rem;
`;

const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px #ffab40;
  border-color: #ffab40 transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
  margin: 1rem auto;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: left;
`;

const Rocket = styled.div`
  width: 100%;
  max-width: 400px;
  animation: ${move} 2.5s ease infinite;
`;

const AboutText = styled.div`
  max-width: 500px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #004d40;
  font-family: 'Roboto', sans-serif;
`;

const BenefitsSection = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 250px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2rem;
  color: #01579b;
  margin-bottom: 1rem;
`;

const About = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <AboutSection id="about">
      {/* Section du slider */}
      <SliderContainer>
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </SliderContainer>

      <Main>
        <Title>Qui sommes-nous</Title>
        <CurvedLine />

        <Content>
          <Rocket>
            <Lottie animationData={travelAnimation} loop={true} />
          </Rocket>
          <AboutText>
            <Text>
              Nous sommes votre partenaire de confiance pour la gestion de vos voyages. Que vous planifiez une escapade en famille, un voyage d'affaires ou une aventure solo, notre équipe vous accompagne à chaque étape.
            </Text>
          </AboutText>
        </Content>

        {/* Section des avantages */}
        <BenefitsSection>
          {[{
            icon: <FaCheckCircle />, title: "Service Personnalisé", description: "Des solutions adaptées à vos besoins."
          }, {
            icon: <FaGlobe />, title: "Destinations Mondiales", description: "Voyagez partout dans le monde."
          }, {
            icon: <FaHeadset />, title: "Support 24/7", description: "Une assistance disponible à tout moment."
          }, {
            icon: <FaUserFriends />, title: "Équipe Expérimentée", description: "Profitez de notre expertise."
          }].map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitCard>
          ))}
        </BenefitsSection>
      </Main>
    </AboutSection>
  );
};

export default About;
