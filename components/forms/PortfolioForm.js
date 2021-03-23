import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import {useEffect, useState} from  'react'

const PortfolioForm = ({onSubmit}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndtDate] = useState(null);

  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    register({name:"startDate"})
    register({name:"endDate"})
  }, [register])

  const handleChangeDate = (dateType, setDate) => date => {
    setValue(dateType, (date && new Date(date.setHours(0,0,0,0)).toISOString()) || date);
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"/>
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          ref={register}
          name="company"
          type="text"
          className="form-control"
          id="company"/>
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          ref={register}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"/>
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register}
          name="location"
          type="text"
          className="form-control"
          id="location"/>
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"/>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description">
        </textarea>
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleChangeDate('startDate', setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            disabled={!endDate}
            selected={endDate}
            onChange={handleChangeDate('endDate', setEndtDate)}
          />
        </div>
      </div>
      <div className="form-group">
        {endDate &&
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleChangeDate('endDate', setEndtDate)(null)}
          >
            Disabled End Date
          </button>
        }
        {!endDate &&
          <button
          type="button"
          className="btn btn-success"
          onClick={() => handleChangeDate('endDate', setEndtDate)(new Date())}
          >
            Set End Date
          </button>
        }
      </div>
      <button
        type="submit"
        className="btn btn-primary">Create
      </button>
    </form>
  )
}

export default PortfolioForm;