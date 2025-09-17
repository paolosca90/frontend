import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ui/ThemedText';
import { ThemedCard } from '../ui/ThemedCard';
import { TradingSignal } from '../../types/TradingSignal';
import { formatPrice, getTimeUntilExpiry } from '../../utils/formatters';

interface SignalCardProps {
  signal: TradingSignal;
  onPress?: () => void;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00ff88';
      case 'executed': return '#ffaa00';
      case 'expired': return '#ff4444';
      case 'completed': return '#0099ff';
      default: return '#666';
    }
  };

  const getDirectionIcon = (type: 'BUY' | 'SELL') => {
    return type === 'BUY' ? 'trending-up' : 'trending-down';
  };

  const getDirectionColor = (type: 'BUY' | 'SELL') => {
    return type === 'BUY' ? '#00ff88' : '#ff4444';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <ThemedCard style={[styles.cardContent, { borderLeftColor: getStatusColor(signal.status) }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Ionicons
              name={getDirectionIcon(signal.type)}
              size={20}
              color={getDirectionColor(signal.type)}
            />
            <ThemedText variant="mono" weight="bold" style={styles.symbol}>
              {signal.symbol}
            </ThemedText>
            <ThemedText variant="caption" color="secondary" style={styles.name} numberOfLines={1}>
              {signal.instrumentName}
            </ThemedText>
          </View>

          <View style={styles.rightSection}>
            <View style={[styles.statusBadge, { borderColor: getStatusColor(signal.status) }]}>
              <ThemedText variant="mono" style={{ color: getStatusColor(signal.status), fontSize: 10 }}>
                {signal.status.toUpperCase()}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.row}>
            <View style={styles.column}>
              <ThemedText variant="caption" color="secondary">
                ENTRY
              </ThemedText>
              <ThemedText variant="mono" weight="bold">
                {formatPrice(signal.entryPrice)}
              </ThemedText>
            </View>

            <View style={styles.column}>
              <ThemedText variant="caption" color="secondary">
                CURRENT
              </ThemedText>
              <ThemedText variant="mono" weight="bold" style={{ color: '#0099ff' }}>
                {formatPrice(signal.currentPrice)}
              </ThemedText>
            </View>

            <View style={styles.column}>
              <ThemedText variant="caption" color="secondary">
                CONFIDENCE
              </ThemedText>
              <ThemedText variant="mono" weight="bold" style={{ color: '#00ff88' }}>
                {Math.round(signal.confidence * 100)}%
              </ThemedText>
              <View style={styles.confidenceContainer}>
                <View style={styles.confidenceBar}>
                  <View
                    style={[
                      styles.confidenceFill,
                      { width: `${signal.confidence * 100}%` }
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Prices */}
        <View style={styles.prices}>
          <View style={styles.priceRow}>
            <ThemedText variant="caption" color="secondary">
              <Ionicons name="shield" size={12} color="#ff4444" />
              {' STOP'}
            </ThemedText>
            <ThemedText variant="mono" style={{ color: '#ff4444' }}>
              {formatPrice(signal.stopLoss)}
            </ThemedText>
          </View>

          <View style={styles.priceRow}>
            <ThemedText variant="caption" color="secondary">
              <Ionicons name="checkmark-circle" size={12} color="#00ff88" />
              {' TARGET'}
            </ThemedText>
            <ThemedText variant="mono" style={{ color: '#00ff88' }}>
              {formatPrice(signal.takeProfit)}
            </ThemedText>
          </View>
        </View>

        {/* Motivations Preview */}
        {signal.motivations && signal.motivations.length > 0 && (
          <View style={styles.motivations}>
            <ThemedText variant="caption" color="secondary" style={styles.motivationTitle}>
              MOTIVAZIONI
            </ThemedText>
            <ThemedText variant="mono" style={styles.motivationText} numberOfLines={2}>
              {signal.motivations[0]}
            </ThemedText>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <ThemedText variant="mono" style={{ color: '#666', fontSize: 10 }}>
              {signal.signalId}
            </ThemedText>
          </View>

          <View style={styles.footerRight}>
            <Ionicons name="time-outline" size={12} color="#ffaa00" />
            <ThemedText variant="mono" style={{ color: '#ffaa00', fontSize: 10, marginLeft: 4 }}>
              {getTimeUntilExpiry(signal.expiresAt)}
            </ThemedText>
          </View>
        </View>

        {/* Execute Button for Active Signals */}
        {signal.status === 'active' && (
          <View style={styles.executeContainer}>
            <TouchableOpacity style={styles.executeButton} onPress={onPress}>
              <Ionicons name="play-circle" size={16} color="#0a0a0a" />
              <ThemedText variant="mono" weight="bold" style={styles.executeText}>
                ESEGUI SU MT5
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </ThemedCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  cardContent: {
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbol: {
    fontSize: 18,
    marginLeft: 8,
    color: '#00ff88',
  },
  name: {
    marginLeft: 8,
    maxWidth: 120,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  details: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  confidenceContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  confidenceBar: {
    width: 40,
    height: 3,
    backgroundColor: '#333',
    borderRadius: 1.5,
    marginTop: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 1.5,
  },
  prices: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  motivations: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  motivationTitle: {
    marginBottom: 4,
  },
  motivationText: {
    color: '#ccc',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  executeContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#00ff88',
  },
  executeButton: {
    backgroundColor: '#00ff88',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  executeText: {
    color: '#0a0a0a',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default SignalCard;