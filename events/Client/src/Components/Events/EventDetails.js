import React from "react";
import PropTypes from "prop-types";
import "./Events.css";
import dayjs from "dayjs";
import { Image, Header, Segment } from "semantic-ui-react";
import { VALUTA } from "../../constants";
import "./EventDetails.css";
import tr from "../../Utils/translationHelper";

const EventDetails = props => {
  const {
    imgSrc,
    title,
    text,
    price,
    dateTimeFrom,
    dateTimeTo,
    priceDetails,
    eventId,
    website,
    address,
    locationLat,
    locationLng,
    phone
  } = props;

  return (
    <div className="Event-details">
      <Header as="h1">{title}</Header>
      <div className="Event-details-from-date">
        {dayjs(dateTimeFrom).format("DD MMMM")}
      </div>
      {imgSrc ? (
        <Image fluid className="Event-details-thumb" src={imgSrc} />
      ) : (
        ""
      )}
      <Segment className="Event-details-all-info" padded>
        <Header as="h3">{tr("EventDetails", "Details")}</Header>

        <div className="Event-details-all-info-items">
          <EventDetailsItem
            itemContent={dayjs(dateTimeFrom).format("HH:MM")}
            itemName={tr("TimeStart", "Time start:")}
          />
          {dateTimeTo ? (
            <EventDetailsItem
              itemContent={dayjs(dateTimeTo).format("HH:MM")}
              itemName={tr("TimeEnd", "Time end:")}
            />
          ) : (
            ""
          )}
          {address && address.length > 0 ? (
            <EventDetailsItem
              itemContent={address}
              itemName={tr("Address", "Address:")}
            />
          ) : (
            ""
          )}
          {phone && phone.length > 0 ? (
            <EventDetailsItem
              itemContent={phone}
              itemName={tr("Phone", "Phone:")}
            />
          ) : (
            ""
          )}
          {website && website.length > 0 ? (
            <EventDetailsItem
              itemContent={website}
              itemName={tr("WebsiteInfo", "Website :")}
            />
          ) : (
            ""
          )}
          <EventDetailsItem
            itemContent={`${price} ${VALUTA}`}
            itemName={tr("Price", "Price: ")}
          />
          {priceDetails && priceDetails.length > 0 ? (
            <EventDetailsItem
              itemContent={priceDetails}
              itemName={tr("PriceDetails", "Price details:")}
            />
          ) : (
            ""
          )}
        </div>
      </Segment>

      <div className="Event-details-text">{text}</div>
    </div>
  );
};

EventDetails.defaultProps = {
  imgSrc:
    "https://cdn.pixabay.com/photo/2018/05/31/12/02/celebration-3443810_960_720.jpg",
  title: "Title",
  text: `It is a long established fact that a reader will be distracted by the 
  readable content of a page when looking at its layout. 
  The point of using Lorem Ipsum is that it has a more-or-less normal 
  distribution of letters, as opposed to using 'Content here, content here', 
  making it look like readable English. Many desktop publishing packages 
  and web page editors now use Lorem Ipsum as their default model text, 
  and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
  Various versions have evolved over the years, sometimes by accident, sometimes 
  on purpose (injected humour and the like).
  `,
  price: 100,
  priceDetails: "100 kr per person",
  dateTimeFrom: null, // "2009-10-14T19:00:00"
  dateTimeTo: null,
  website: "www.url.com",
  address: "Pedersgaten, 43, Stavanger, 4012",
  locationLng: null, // 5.733107
  locationLat: null, // 58.969975,
  phone: "95222100"
};

EventDetails.propTypes = {
  eventId: PropTypes.number.isRequired,
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.number,
  priceDetails: PropTypes.string,
  dateTimeTo: PropTypes.string,
  dateTimeFrom: PropTypes.string,
  website: PropTypes.string,
  address: PropTypes.string,
  locationLng: PropTypes.number,
  locationLat: PropTypes.number,
  phone: PropTypes.string
};

const EventDetailsItem = props => {
  const { itemName, itemContent } = props;

  if (!itemName || !itemContent) return null;

  return (
    <div className="Event-details-all-info-item">
      <h5 className="Event-details-info-item-name">{itemName}</h5> {itemContent}
    </div>
  );
};

EventDetailsItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemContent: PropTypes.string.isRequired
};

export default EventDetails;
