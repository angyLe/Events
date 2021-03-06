import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Header, Segment, Card } from "semantic-ui-react";
import { VALUTA } from "../../../constants";
import "./EventDetails.css";
import tr from "../../../Utils/translationHelper";
import ImageItem from "../../Images/ImageItem";

const EventDetails = props => {
  const { eventTranslation = {} } = props;

  const {
    imageId,
    title,
    text,
    price,
    dateTimeFrom,
    dateTimeTo,
    priceDetails,
    website,
    address,
    phone
  } = eventTranslation;

  return (
    <Card fluid className="Event-details">
      <Card.Content>
        <Card.Header className="Event-details-header">{title}</Card.Header>
        <Card.Meta className="Event-details-from-date">
          {dayjs(dateTimeFrom).format("DD MMMM")}
        </Card.Meta>
        <ImageItem
          fluid
          imageId={imageId}
          isBg={false}
          customClassName="Event-details-thumb"
        />
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
      </Card.Content>
    </Card>
  );
};

EventDetails.defaultProps = {
  eventTranslation: {}
};

EventDetails.propTypes = {
  eventTranslation: PropTypes.shape({
    eventId: PropTypes.number,
    imgSrc: PropTypes.string,
    imageId: PropTypes.number,
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
  })
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
