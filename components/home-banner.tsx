import Image from 'next/image';

export function HomeBanner() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
      <Image
        src="/M02D10_SITEBANNER1c_GO.png"
        alt="Go Business Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Go Business</h1>
          <p className="text-xl">
            Gerencie seus projetos, tarefas e equipe em um só lugar
          </p>
        </div>
      </div>
    </div>
  );
}

