'use client'

import { Ship, TierRating } from '@/generated/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Heart, Anchor } from 'lucide-react'

interface ShipCardProps {
  ship: Ship & {
    tierRatings: TierRating[]
  }
  gameMode?: string
  showStats?: boolean
  showTier?: boolean
  className?: string
  onClick?: () => void
}

export default function ShipCard({ 
  ship, 
  gameMode = 'campaign_mob',
  showStats = true,
  showTier = true,
  className = '',
  onClick 
}: ShipCardProps) {
  const currentTier = ship.tierRatings.find(t => t.gameMode === gameMode)
  
  const rarityColors = {
    'Common': 'bg-gray-500',
    'Rare': 'bg-blue-500',
    'Elite': 'bg-purple-500',
    'Super Rare': 'bg-yellow-500',
    'Ultra Rare': 'bg-red-500',
    'Decisive': 'bg-pink-500'
  }

  const tierColors = {
    'EX': 'bg-pink-600 text-white',
    'T0': 'bg-red-600 text-white',
    'T1': 'bg-orange-500 text-white',
    'T2': 'bg-yellow-500 text-black',
    'T3': 'bg-green-500 text-white',
    'T4': 'bg-gray-500 text-white'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card 
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        {/* Tier Badge */}
        {showTier && currentTier && (
          <div className="absolute top-2 right-2 z-10">
            <Badge 
              variant="secondary" 
              className={`${tierColors[currentTier.tier as keyof typeof tierColors]} font-bold shadow-lg`}
            >
              {currentTier.tier}
            </Badge>
          </div>
        )}

        {/* Ship Image */}
        <div className="relative h-48 overflow-hidden">
          {ship.imageUrl ? (
            <Image
              src={ship.imageUrl}
              alt={ship.name}
              fill
              className="object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
              <Anchor className="w-16 h-16 text-slate-400" />
            </div>
          )}
          
          {/* Faction overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <Badge variant="outline" className="text-white border-white/50">
              {ship.faction}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white truncate">{ship.name}</h3>
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${rarityColors[ship.rarity as keyof typeof rarityColors] || 'bg-gray-500'}`} />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>{ship.shipType}</span>
            <span>•</span>
            <span>{ship.hullType}</span>
          </div>
        </CardHeader>

        {showStats && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-red-400" />
                <span className="text-slate-300">{ship.healthMax.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-slate-300">{ship.firepowerMax}</span>
              </div>
              <div className="text-slate-400">
                Oil: {ship.oilConsumptionMax}
              </div>
              <div className="text-slate-400">
                Luck: {ship.luckMax}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}