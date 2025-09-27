'use client'

import { Equipment, EquipmentTierRating } from '@/generated/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Zap, Shield, Target, Plus } from 'lucide-react'

interface EquipmentCardProps {
  equipment: Equipment & {
    tierRatings: EquipmentTierRating[]
  }
  gameMode?: string
  enhancementLevel?: number
  showTier?: boolean
  className?: string
  onClick?: () => void
}

export default function EquipmentCard({ 
  equipment, 
  gameMode = 'campaign_mob',
  enhancementLevel = 0,
  showTier = true,
  className = '',
  onClick 
}: EquipmentCardProps) {
  const currentTier = equipment.tierRatings.find(t => t.gameMode === gameMode)
  
  const rarityColors = {
    'Common': 'bg-gray-500',
    'Rare': 'bg-blue-500',
    'Elite': 'bg-purple-500',
    'Super Rare': 'bg-yellow-500',
    'Ultra Rare': 'bg-red-500'
  }

  const tierColors = {
    'T0': 'bg-red-600 text-white',
    'T1': 'bg-orange-500 text-white',
    'T2': 'bg-yellow-500 text-black',
    'T3': 'bg-green-500 text-white',
    'T4': 'bg-gray-500 text-white'
  }

  const categoryIcons = {
    'Main Gun': Zap,
    'Secondary Gun': Target,
    'Anti-Air': Shield,
    'Torpedo': Zap,
    'Fighter': Zap,
    'Dive Bomber': Target,
    'Torpedo Bomber': Zap,
    'Auxiliary': Plus
  }

  const Icon = categoryIcons[equipment.category as keyof typeof categoryIcons] || Plus

  // Calculate enhanced stats
  const getEnhancedStat = (base: number, max: number) => {
    if (enhancementLevel === 0) return base
    const enhancement = enhancementLevel / 10 // Assuming max +10
    return Math.round(base + (max - base) * enhancement)
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

        {/* Enhancement Level */}
        {enhancementLevel > 0 && (
          <div className="absolute top-2 left-2 z-10">
            <Badge variant="outline" className="bg-black/50 text-white border-white/50">
              +{enhancementLevel}
            </Badge>
          </div>
        )}

        {/* Equipment Image */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-600">
          {equipment.imageUrl ? (
            <Image
              src={equipment.imageUrl}
              alt={equipment.name}
              fill
              className="object-contain object-center p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-12 h-12 text-slate-400" />
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm truncate">{equipment.name}</h3>
            <div className={`w-3 h-3 rounded-full ${rarityColors[equipment.rarity as keyof typeof rarityColors] || 'bg-gray-500'}`} />
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>{equipment.category}</span>
            <span>•</span>
            <span>{equipment.techType}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-1 text-xs">
            {equipment.firepowerBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">FP:</span>
                <span className="text-orange-400 font-medium">
                  {getEnhancedStat(equipment.firepowerBase, equipment.firepowerMax)}
                </span>
              </div>
            )}
            {equipment.torpedoBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">TRP:</span>
                <span className="text-blue-400 font-medium">
                  {getEnhancedStat(equipment.torpedoBase, equipment.torpedoMax)}
                </span>
              </div>
            )}
            {equipment.antiAirBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AA:</span>
                <span className="text-green-400 font-medium">
                  {getEnhancedStat(equipment.antiAirBase, equipment.antiAirMax)}
                </span>
              </div>
            )}
            {equipment.aviationBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">AVI:</span>
                <span className="text-purple-400 font-medium">
                  {getEnhancedStat(equipment.aviationBase, equipment.aviationMax)}
                </span>
              </div>
            )}
            {equipment.reloadBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">RLD:</span>
                <span className="text-yellow-400 font-medium">
                  {getEnhancedStat(equipment.reloadBase, equipment.reloadMax)}
                </span>
              </div>
            )}
            {equipment.hitBase > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">HIT:</span>
                <span className="text-cyan-400 font-medium">
                  {getEnhancedStat(equipment.hitBase, equipment.hitMax)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}