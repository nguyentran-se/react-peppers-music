import React from "react";
import Card from "./Card/Card";
import "./ListCard.scss";

const ListCard = ({ cards, cardShape = "square" }) => {
   // console.log(cards);
   let transformedCards;
   if (cards) {
      transformedCards = cards.map((c, index) => (
         <Card
            cardImage={c?.images?.[0].url}
            cardId={c.id}
            cardName={c.name}
            cardArtist={null}
            cardDescription={c.description}
            cardShape={cardShape}
            cardType={c.type}
            key={c.id}
         />
      ));
   }
   return <div className="list-card">{transformedCards}</div>;
};

export default ListCard;
