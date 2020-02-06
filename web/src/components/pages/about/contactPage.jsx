import React from "react";
import PageTitle from "../../main/pageTittle";

const ContactPage = () => {
  return (
    <div id="main">
      <PageTitle title={"За нас"} />
      <section className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <form method="post">
                <div className="form-area">
                  <div className="form-left">
                    <ul>
                      <li>
                        {" "}
                        <i className="fa fa-user"></i>
                        <input
                          type="text"
                          placeholder="Име"
                          required=""
                          className="detail-input"
                          name="name"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa fa-envelope-o"></i>
                        <input
                          type="text"
                          placeholder="Имейл"
                          required=""
                          pattern="^[a-zA-Z0-9-\_.]+@[a-zA-Z0-9-\_.]+\.[a-zA-Z0-9.]{2,5}$"
                          className="detail-input"
                          name="email"
                        />
                      </li>

                      <li>
                        {" "}
                        <i className="fa fa-pencil"></i>
                        <input
                          placeholder="Отностно"
                          type="text"
                          required=""
                          className="detail-input"
                          name="subject"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa fa-pencil"></i>
                        <textarea
                          rows="10"
                          cols="10"
                          name="comments"
                          required=""
                          className="detail-textarea"
                          placeholder="Съобщение"
                        ></textarea>
                        <input
                          type="submit"
                          value="Изпрати"
                          className="detail-btn-sumbit2"
                          name="submit"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-5 col-sm-5 " style={{ minHeight: "400px" }}>
              <address>
                <strong className="heading">Информация за връзка</strong>
                <ul>
                  <li>
                    <a href="mailto:" className="email">
                      <i className="fa fa-envelope-o"></i>info@molitvabg.org
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com/molitvabg" className="email">
                      <i className="fa fa-facebook-square"></i>{" "}
                      facebook.com/molitvabg
                    </a>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
