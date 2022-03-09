import React from "react";

const PeopleList = () => {
  return (
    <div class="container">
      <div class="card">
        <img
          src="https://scontent-hbe1-1.xx.fbcdn.net/v/t1.18169-9/13882238_1353039508044292_4623797003777781329_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFW_C5-7gNNMp8U0LpmifT5ae4bPm3Sydpp7hs-bdLJ2sV-DWiCpF4LjF754pt4VL-mMbQNc0U3_Dja6dQch9kc&_nc_ohc=ZVg1t31QYLkAX84Ojth&_nc_ht=scontent-hbe1-1.xx&oh=00_AT-ASMupDAz2x5jluEDLLfoTiq3hFvDgx4MSQ4vyMt0Bng&oe=624B7BA9"
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Hamdy Youssef</p>
        <div class="grid-container">
          <div class="grid-child-Position">Front-End</div>
        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
      <div class="card">
        <img
          src="https://scontent-hbe1-1.xx.fbcdn.net/v/t1.6435-9/125184090_2802924606696137_7870174487692515028_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_eui2=AeEzC-rZDYiZVHDl2XXgcMH-oFm6158qdlGgWbrXnyp2Ue0rL9WDokSFUAGspFt4bsQ8S34RtQ6CLDOHNEho1RPB&_nc_ohc=9ohO5QWjMVsAX-RlSPx&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_tLL466uAP9Lk93Vp2h9lFyIiaQW1-ThE3__rE2Q32Ig&oe=624BC865"
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Mohamed Sayed</p>
        <div class="grid-container">
          <div class="grid-child-Position">Cyber Security</div>

        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
      <div class="card">
        <img
          src="https://scontent.fcai20-2.fna.fbcdn.net/v/t1.6435-9/180325393_940867273338457_1404696902596464854_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_eui2=AeHjLszgSjUlan559_-YAsyPalZN_ZbO2OlqVk39ls7Y6blwEx4-I5WCZCjJNTlEyp06-XmQPIohp7bItI0Fe8aw&_nc_ohc=xUbFZRLZIHUAX89A0_A&_nc_ht=scontent.fcai20-2.fna&oh=00_AT9pX0UdO0YNoRbi0E1w-CRowVABvZr6x9UykpkNuMh8-g&oe=624C6FE5"
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Mohamed Mousa</p>
        <div class="grid-container">
          <div class="grid-child-Position">Back-End</div>
        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
      <div class="card">
        <img
          src={require("./salah.jpg")}
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Ahmed Salah</p>
        <div class="grid-container">
          <div class="grid-child-Position">Back-End</div>
        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
      <div class="card">
        <img
          src="https://scontent.fcai20-2.fna.fbcdn.net/v/t1.6435-9/65841865_1248153502033899_7590651794217238528_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=174925&_nc_eui2=AeE8HdB2JvliUZDE1CRcDp7izDLw4PjY9U7MMvDg-Nj1TowHm4XmO6Cb_3ij6bmy6pXEE36EJruDpiLxOtnqa6m7&_nc_ohc=7nEI3FdE8K0AX_U9APt&_nc_ht=scontent.fcai20-2.fna&oh=00_AT_UgIukoxvR0cWBdiazqRJuIyBdSpESk1VC9ORgBy4fuw&oe=624E6961"
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Mohamed Ramadan</p>
        <div class="grid-container">
          <div class="grid-child-Position">AI</div>
        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
      <div class="card">
        <img
          src={require("./Yehia.jpg")}
          alt="Person"
          class="card__image"
        />
        <p class="card__name">Ahmed Tarek</p>
        <div class="grid-container">
          <div class="grid-child-Position">Front-End</div>
        </div>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button class="btn draw-border">Message</button>
      </div>
    </div>
  );
};
export default PeopleList;
