interface IStateCards {
  icon: any;
  label: string;
  value: number;
  color: string;
}

interface StateCardsProps {
  stat: IStateCards;
}

const StateCards = ({ stat }: StateCardsProps) => {
  const Icon = stat.icon;
  return (
    <div
      key={stat.label}
      className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
    >
      <div className={`rounded-2xl p-3 ${stat.color}`}>
        <Icon width={24} height={24} />
      </div>
      <div>
        <p className="text-sm text-slate-600">{stat.label}</p>
        <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
      </div>
    </div>
  );
};

export default StateCards;
