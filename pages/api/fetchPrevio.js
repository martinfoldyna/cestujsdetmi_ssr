const axios = require("axios");
export default async (req, res) => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_PREVIO_API_URL}/hotels/search`,
    `<?xml version="1.0"?>
      <request>
        <login>${process.env.NEXT_PUBLIC_PREVIO_LOGIN}</login>
        <password>${process.env.NEXT_PUBLIC_PREVIO_PASSWORD}</password>
        <limit><limit>10</limit></limit>
        <filter>
          <in>
              <field>collaboration</field>
              <value>active</value>
          </in>
          <in>
              <field>couId</field>
              <value>1</value>
          </in>
        </filter>
        <order>
            <by>name</by>
            <desc>false</desc>
        </order>
      </request>`
  );

  res.statusCode = 200;
  res.json({ data: data.data });
};
