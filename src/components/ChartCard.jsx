import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts";

function ChartCard({data}){

  return(

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart data={data}>

        <XAxis dataKey="nama" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="skor" />

      </BarChart>

    </ResponsiveContainer>

  );

}

export default ChartCard;