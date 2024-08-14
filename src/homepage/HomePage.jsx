import home_image from "../images/home_image.webp";

export default function HomePage() {
    return (
        <div>
            <h1>Helclovo zahradnictví - Bohušovice nad Ohří</h1>
            <p>Toto je homepage</p>
            <img src={home_image} alt="Skleník se sadbou květin" />
        </div>
    )
}