import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import tr from "../../Utils/translationHelper";
import ImageEditor from "../../UI/ImageEditor";
import "./EventEditor.css";

const EventEditor = props => {
  const {
    eventId,
    imgSrc,
    title,
    shortDescription,
    text,
    price,
    dateTimeFrom,
    dateTimeTo,
    priceDetails,
    website,
    address,
    phone
  } = props;

  return (
    <Form noValidate className="Event-Editor-Form">
      <div className="Event-Editor-FirstPart">
        <Form.Field className="Event-Editor-Form-Img-Field">
          <ImageEditor imageSrc={imgSrc} />
        </Form.Field>

        <div className="Event-Editor-FirstPart-Inputs">
          <Form.Field>
            <Form.Input
              placeholder={tr("EventTitlePlaceholder", "Event title")}
              label={tr("EventTitleLabel", "Event title")}
              name="title"
              value={title || ""}
              required
              maxLength="10"
              error={false}
              onChange={(e, obj) => console.log(obj)}
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              type="datetime-local"
              required
              label={tr("EventDateTimeFrom", "Event starts (day, time)")}
              name="dateTimeFrom"
              value={dateTimeFrom}
              error={false}
              onChange={(e, obj) => console.log(obj)}
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              type="datetime-local"
              label={tr("EventDateTimeTo", "Event ends (day, time)")}
              name="dateTimeTo"
              value={dateTimeTo}
              error={false}
              onChange={(e, obj) => console.log(obj)}
            />
          </Form.Field>
        </div>
      </div>

      <Form.Field>
        <Form.Input
          type="number"
          step="10"
          min="0"
          placeholder="100"
          label={tr("EventPriceLabel", "Price (NOK)")}
          name="price"
          value={price}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          type="text"
          placeholder={tr(
            "EventPriceDetailsPlaceholder",
            "100 NOK per children, 120 NOK per adult."
          )}
          label={tr("EventPriceDetailsLabel", "Price details")}
          name="priceDetails"
          value={priceDetails || ""}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          placeholder={tr("EventAddressPlaceholder", "Pedersgaten, 1")}
          label={tr("EventAddressLabel", "Address")}
          name="address"
          required
          value={address || ""}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="url"
          placeholder={tr("EventWebsitePlaceholder", "www.somelink.com")}
          label={tr("EventWebsiteLabel", "Website")}
          name="website"
          value={website || ""}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="tel"
          placeholder={tr("EventPhonePlaceholder", "xxxxxxxx")}
          label={tr("EventPhoneLabel", "Phone number")}
          name="phone"
          value={phone || ""}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>

      <Form.Field>
        <Form.TextArea
          placeholder="Short description, will be shown in list of events"
          label={tr("EventShortDescriptionLabel", "Short description")}
          rows="4"
          name="shortDescription"
          value={shortDescription || ""}
          required
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>

      <Form.Field>
        <Form.TextArea
          label={tr("EventTextLabel", "Text")}
          rows="10"
          name="text"
          required
          value={text || ""}
          error={false}
          onChange={(e, obj) => console.log(obj)}
        />
      </Form.Field>
      <Form.Button content="Submit" floated="right" />
    </Form>
  );
};

EventEditor.defaultProps = {
  eventId: null,
  imgSrc:
    "https://cdn.pixabay.com/photo/2018/05/31/12/02/celebration-3443810_960_720.jpg",
  title: "",
  shortDescription: "",
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
  price: undefined,
  priceDetails: "",
  dateTimeFrom: "2009-10-14T19:00:00", // "2009-10-14T19:00:00"
  dateTimeTo: "2009-10-14T19:00:00",
  website: "",
  address: "",
  phone: ""
};

EventEditor.propTypes = {
  eventId: PropTypes.number,
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.number,
  priceDetails: PropTypes.string,
  dateTimeTo: PropTypes.string,
  dateTimeFrom: PropTypes.string,
  website: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string
};

export default EventEditor;
