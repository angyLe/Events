import React from "react";
import PropTypes from "prop-types";
import { Form, Message } from "semantic-ui-react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import tr from "../../../Utils/translationHelper";
import ImageEditor from "../../../UI/ImageEditor";
import { SAVING_STATE } from "../../../constants";
import { checkIfValid } from "../../../Utils/validationHelper";
import "./EventEditor.css";

const EventEditor = props => {
  const {
    eventFormFields,
    eventSavingState,
    saveEvent,
    updateEventTranslation,
    updateEvent,
    validationErrors
  } = props;
  const {
    imgSrc,
    name,
    title,
    shortDescription,
    text,
    price = 0,
    dateTimeFrom,
    dateTimeTo,
    priceDetails,
    website,
    address,
    phone
  } = eventFormFields;

  return (
    <Form noValidate className="Event-Editor-Form">
      <div className="Event-Editor-FirstPart">
        <Form.Field className="Event-Editor-Form-Img-Field">
          <ImageEditor
            onFileChosen={file =>
              updateEvent({
                value: file.id,
                property: "imageId"
              })
            }
            imageSrc={imgSrc}
          />
        </Form.Field>

        <div className="Event-Editor-FirstPart-Inputs">
          <Form.Field>
            <Form.Input
              placeholder={tr("EventNamePlaceholder", "Event name")}
              label={tr("EventNameLabel", "Event name")}
              name="name"
              value={name || ""}
              required
              error={checkIfValid({
                validationErrors,
                propName: "name"
              })}
              onChange={(e, obj) => {
                updateEvent({
                  value: obj.value,
                  property: "name"
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder={tr("EventTitlePlaceholder", "Event title")}
              label={tr("EventTitleLabel", "Event title")}
              name="title"
              value={title || ""}
              required
              maxLength="100"
              error={checkIfValid({
                validationErrors,
                propName: "title"
              })}
              onChange={(e, obj) => {
                updateEventTranslation({
                  value: obj.value,
                  property: "title"
                });
              }}
            />
          </Form.Field>

          <Form.Field
            required
            error={checkIfValid({
              validationErrors,
              propName: "dateTimeFrom"
            })}
          >
            <label>{tr("EventDateTimeFrom", "Event starts (day, time)")}</label>
            <Flatpickr
              data-enable-time
              value={dateTimeFrom}
              onChange={(selectedDates, dateStr, instance) => {
                updateEvent({
                  value: dateStr,
                  property: "dateTimeFrom"
                });
              }}
            />
          </Form.Field>

          <Form.Field
            error={checkIfValid({
              validationErrors,
              propName: "dateTimeTo"
            })}
          >
            <label>{tr("EventDateTimeTo", "Event ends (day, time)")}</label>
            <Flatpickr
              data-enable-time
              value={dateTimeTo}
              onChange={(selectedDates, dateStr, instance) => {
                updateEvent({
                  value: dateStr,
                  property: "dateTimeTo"
                });
              }}
            />
          </Form.Field>
        </div>
      </div>

      <Form.Field>
        <Form.Input
          type="number"
          step="10"
          min="1"
          placeholder="100"
          label={tr("EventPriceLabel", "Price (NOK)")}
          name="price"
          value={price}
          error={checkIfValid({
            validationErrors,
            propName: "price"
          })}
          onChange={(e, obj) => {
            updateEvent({
              value: obj.value,
              property: "price"
            });
          }}
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
          error={checkIfValid({
            validationErrors,
            propName: "priceDetails"
          })}
          onChange={(e, obj) => {
            updateEventTranslation({
              value: obj.value,
              property: "priceDetails"
            });
          }}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          placeholder={tr("EventAddressPlaceholder", "Pedersgaten, 1")}
          label={tr("EventAddressLabel", "Address")}
          name="address"
          required
          value={address || ""}
          error={checkIfValid({
            validationErrors,
            propName: "address"
          })}
          onChange={(e, obj) => {
            updateEvent({
              value: obj.value,
              property: "address"
            });
          }}
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="url"
          placeholder={tr("EventWebsitePlaceholder", "www.somelink.com")}
          label={tr("EventWebsiteLabel", "Website")}
          name="website"
          value={website || ""}
          error={checkIfValid({
            validationErrors,
            propName: "website"
          })}
          onChange={(e, obj) => {
            updateEvent({
              value: obj.value,
              property: "website"
            });
          }}
        />
      </Form.Field>

      <Form.Field>
        <Form.Input
          type="tel"
          placeholder={tr("EventPhonePlaceholder", "xxxxxxxx")}
          label={tr("EventPhoneLabel", "Phone number")}
          name="phone"
          maxLength="8"
          value={phone || ""}
          error={checkIfValid({
            validationErrors,
            propName: "phone"
          })}
          onChange={(e, obj) => {
            updateEvent({
              value: obj.value,
              property: "phone"
            });
          }}
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
          error={checkIfValid({
            validationErrors,
            propName: "shortDescription"
          })}
          onChange={(e, obj) => {
            updateEventTranslation({
              value: obj.value,
              property: "shortDescription"
            });
          }}
        />
      </Form.Field>

      <Form.Field>
        <Form.TextArea
          label={tr("EventTextLabel", "Text")}
          rows="10"
          name="text"
          required
          value={text || ""}
          error={checkIfValid({
            validationErrors,
            propName: "text"
          })}
          onChange={(e, obj) => {
            updateEventTranslation({ value: obj.value, property: "text" });
          }}
        />
      </Form.Field>

      <Message
        success
        header="Form Completed"
        content="You're all signed up for the newsletter"
      />

      <Form.Button
        onClick={saveEvent}
        loading={eventSavingState === SAVING_STATE.saving}
        positive={false}
        negative={false}
        disabled={eventSavingState === SAVING_STATE.saving}
        primary
        content={tr("SubmitButton", "Submit")}
        floated="right"
      />
    </Form>
  );
};

EventEditor.defaultProps = {
  eventFormFields: {},
  eventSavingState: null,
  validationErrors: null
};

EventEditor.propTypes = {
  eventFormFields: PropTypes.shape({
    eventId: PropTypes.number,
    name: PropTypes.string,
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
  }),
  eventSavingState: PropTypes.string,
  saveEvent: PropTypes.func.isRequired,
  updateEventTranslation: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  validationErrors: PropTypes.instanceOf(Array)
};

export default EventEditor;
