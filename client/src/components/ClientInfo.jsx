import React from "react";

export default function ClientInfo({ client }) {
  return (
    <>
      <h5 className='mt-5'>Client Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>{client.name}
        </li>
        <li className='list-group-item'>{client.email}
        </li>
        <li className='list-group-item'>{client.phone}
        </li>
      </ul>
    </>
  );
}
